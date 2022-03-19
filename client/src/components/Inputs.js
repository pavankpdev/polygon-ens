import React, {useState, useEffect} from 'react';
import { ethers } from "ethers";

import contractAbi from '../contracts/Domains.json'

const Inputs = () => {
    const [domain, setDomain] = useState('');
    const [record, setRecord] = useState('');

    const mintDomain = async () => {
        // Don't run if the domain is empty
        if (!domain) { return }
        // Alert the user if the domain is too short
        if (domain.length < 3) {
            alert('Domain must be at least 3 characters long');
            return;
        }
        // Calculate price based on length of domain (change this to match your contract)
        // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
        const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1';
        console.log("Minting domain", domain, "with price", price);
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract('0xc8F1cAD09c56B06b5Bc75b1d9e5a462642890159', contractAbi.abi, signer);

                let tx = await contract.register(domain, {value: ethers.utils.parseEther(price)});
                // Wait for the transaction to be mined
                const receipt = await tx.wait();

                // Check if the transaction was successfully completed
                if (receipt.status === 1) {
                    console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);

                    // Set the record for the domain
                    tx = await contract.setRecord(domain, record);
                    await tx.wait();

                    console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);

                    setRecord('');
                    setDomain('');
                }
                else {
                    alert("Transaction failed! Please try again");
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return <>
        <div className="form-container">
            <div className="first-row">
                <input
                    type="text"
                    value={domain}
                    placeholder='domain'
                    onChange={e => setDomain(e.target.value)}
                />
                <p className='tld'> .dsc </p>
            </div>

            <input
                type="text"
                value={record}
                placeholder='Add a record'
                onChange={e => setRecord(e.target.value)}
            />

            <div className="button-container">
                <button className='btn-primary' disabled={null} onClick={mintDomain}>
                    Mint
                </button>
            </div>

        </div>
    </>
}

export  default Inputs;