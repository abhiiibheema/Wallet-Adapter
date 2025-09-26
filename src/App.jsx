import { useState } from 'react'
import './App.css'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import {RequestAirDrop} from "./RequestAirDrop.jsx";
import {UserDetails} from "./UserDetails.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="app-container">
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="main-content">
                <header className="header">
                  <div className="logo">
                    <h1>Solana Wallet</h1>
                  </div>
                  <div className="wallet-controls">
                    <WalletMultiButton className="connect-button" />
                    <WalletDisconnectButton className="disconnect-button" />
                  </div>
                </header>

                <main className="content-area">
                  <div className="feature-card">
                    <h2>Request DevNet SOL</h2>
                    <p>Get test tokens for development</p>
                    <RequestAirDrop/>
                    <UserDetails />
                  </div>

                </main>

                <footer className="footer">
                  <p>Powered by Solana DevNet</p>
                </footer>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
  )
}

export default App
