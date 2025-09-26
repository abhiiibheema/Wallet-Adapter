import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import { useState } from "react";

export function RequestAirDrop(){
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    async function requestAirDrop(){
        if (!wallet.connected || !wallet.publicKey) {
            alert("Connect wallet first!");
            return;
        }

        if(!amount || parseFloat(amount) <= 0){
            alert("Please enter valid amount!");
            return;
        }

        setLoading(true);
        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                parseFloat(amount) * LAMPORTS_PER_SOL
            );

            await connection.confirmTransaction(signature);
            alert(`✅ Successfully received ${amount} SOL!`);
            setAmount('');
        } catch (error) {
            console.error("Airdrop failed:", error);
            if (error.message.includes("429") || error.message.includes("limit")) {
                alert("❌ Daily limit reached! Try faucet.solana.com");
            } else {
                alert(`❌ Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="airdrop-form">
            <input
                type="number"
                placeholder="Amount (max 5 SOL)..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading || !wallet.connected}
                min="0.1"
                max="5"
                step="0.1"
            />
            <button
                onClick={requestAirDrop}
                disabled={loading || !wallet.connected || !amount}
                className="airdrop-btn"
            >
                {loading ? "Requesting..." : "Request Airdrop"}
            </button>
        </div>
    )
}
