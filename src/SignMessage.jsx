import {useWallet} from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519.js";
import bs58 from "bs58"
import React from 'react';

export function SignMessage() {
    const {publicKey, signMessage} = useWallet()

    async function handleSignMessage() {
        if(!publicKey || !signMessage) {
            alert("Wallet not connected or doesn't support signing!");
            return;
        }

        const message = document.getElementById("sign-message").value;
        if(!message) {
            alert("Please enter a message!");
            return;
        }

        try {
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);

            if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
                alert("❌ Message signature invalid!");
                return;
            }
            alert("✅ Success! Message signed and verified!");
        } catch (error) {
            alert("❌ Error: " + error.message);
        }
    }

    return (
        <div className="feature-card sign-message-card">
            <h3>📝 Sign Message</h3>
            <p>Sign any message with your wallet</p>

            <div className="sign-form">
                <input
                    id="sign-message"
                    type="text"
                    placeholder="Enter your message here..."
                />
                <button
                    onClick={handleSignMessage}
                    disabled={!publicKey}
                    className="sign-btn"
                >
                    Sign Message
                </button>
            </div>
        </div>
    )
}
