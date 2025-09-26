import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export function RequestAirDrop(){
    const wallet = useWallet();
    const {connection} = useConnection();
    function requestAirDrop(){
        const amount = document.getElementById("input-amount").value;
        if(!amount){
            alert("Please enter amount!");
            return;
        }
        const publicKey = wallet.publicKey;
        connection.requestAirdrop(publicKey, parseFloat(amount) * LAMPORTS_PER_SOL)

    }
    return (
        <>
            <div>
                <input id = "input-amount" type="number" placeholder="Amount..."/>
                <button onClick={requestAirDrop}>Request Air Drop</button>

            </div>
        </>
    )
}