import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";

export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    async function signTransaction() {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Connect wallet first!");
            return;
        }

        if (!toAddress || !amount) {
            alert("Fill all fields!");
            return;
        }

        setLoading(true);
        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(toAddress),
                lamports: parseFloat(amount) * LAMPORTS_PER_SOL
            }));

            await wallet.sendTransaction(transaction, connection);
            alert("✅ Tokens sent successfully!");
            setToAddress('');
            setAmount('');
        } catch (err) {
            console.log(err);
            alert("❌ Error: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="send-form">
            <input
                placeholder="Recipient's wallet address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                disabled={loading}
            />
            <input
                placeholder="Amount (SOL)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
            />
            <button
                onClick={signTransaction}
                disabled={loading || !wallet.connected}
                className="send-btn"
            >
                {loading ? "Sending..." : "Send SOL"}
            </button>
        </div>
    )
}
