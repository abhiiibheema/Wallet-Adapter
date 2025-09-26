import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Button} from "@mui/material";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export function UserDetails() {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function getDetails() {
        if (!wallet.publicKey) return alert("Connect wallet!");
        const amount = await connection.getBalance(wallet.publicKey);
        document.getElementById("balance").innerText = `Balance: ${amount / LAMPORTS_PER_SOL} SOL`;
    }

    return (
        <>
            <h3 id="balance"></h3>
            <Button variant="contained" color="primary" onClick={getDetails}>
                Show Balance
            </Button>
        </>
    )
}
