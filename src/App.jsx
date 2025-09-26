import { useState } from 'react'
import './App.css'
import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import {RequestAirDrop} from "./RequestAirDrop.jsx";
import {UserDetails} from "./UserDetails.jsx";
import {SendTokens} from "./SendTokens.jsx";

function App() {
  return (
      <div className="app-container">
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="main-content">
                <header className="header">
                  <div className="logo">
                    <h1>💎 Solana Wallet</h1>
                  </div>
                  <div className="wallet-controls">
                    <WalletMultiButton className="connect-button" />
                    <WalletDisconnectButton className="disconnect-button" />
                  </div>
                </header>

                <main className="dashboard">

                  {/* Balance Card */}
                  <div className="feature-card balance-card">
                    <h3>💰 Your Balance</h3>
                    <UserDetails />
                  </div>

                  {/* Airdrop Card */}
                  <div className="feature-card">
                    <h3>🎁 Get Test SOL</h3>
                    <p>Request devnet tokens for testing</p>
                    <RequestAirDrop/>
                  </div>

                  {/* Send Tokens Card */}
                  <div className="feature-card">
                    <h3>📤 Send Tokens</h3>
                    <p>Transfer SOL to other wallets</p>
                    <SendTokens/>
                  </div>

                </main>

                <footer className="footer">
                  <p>🚀 Powered by Solana DevNet</p>
                </footer>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
  )
}

export default App
