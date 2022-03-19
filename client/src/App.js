import React, {useState, useEffect} from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

import BG_Video from './assets/video/dsc.mp4'

const App = () => {
	const [isWalletConnected, setIsWalletConnect] = useState(true)
	const [currentAccount, setCurrentAccount] = useState('');
	const [web3Supported, setWeb3Supported] = useState(true)

	const checkIfWalletIsConnected = async () => {
		try {
			// First make sure we have access to window.ethereum
			const {ethereum} = window;

			if (!ethereum) {
				setWeb3Supported(false);
				return;
			}

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length !== 0) {
				const account = accounts[0];
				setCurrentAccount(account);
			} else {
				alert('No authorized account found');
			}
		} catch (error) {
			console.log(error)
		}
	}

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				setWeb3Supported(false);
				return;
			}

			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log({accounts})
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, [])

  return (

	  <div id="hero">
		  <div className="texture"></div>
		  <video
			  loop
			  muted
			  autoPlay
			  preload="auto"
		  >
			  <source src={BG_Video} type="video/mp4" />
				  Your browser does not support the video tag.
		  </video>

		  <div className={'App'}>
			  <div className={'container'}>
				  <h2>Demon Slayer Corps Name Service</h2>
				  {
					  !web3Supported &&
					  <h4>You browser doesn't support web3, install <a href={'https://metamask.io/'} style={{color: 'red'}}>Metamask</a> to enable web3. </h4>

				  }
				  {
					  web3Supported &&
					  <button className={'btn-primary btn-metamask'} onClick={connectWallet}>
						  <div className={'metamask-logo'}>
							  <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'} alt={'Metamask logo'} />
						  </div>
						  Connect your metamask wallet
					  </button>
				  }
			  </div>

		  </div>


	  </div>
	);
}

export default App;
