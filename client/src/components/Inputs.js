import React, {useState, useEffect} from 'react';

const Inputs = () => {
    const [domain, setDomain] = useState('');
    const [record, setRecord] = useState('');
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
                <button className='btn-primary' disabled={null} onClick={null} style={{marginRight: '10px'}}>
                    Mint
                </button>
                <button className='btn-primary' disabled={null} onClick={null}>
                    Set data
                </button>
            </div>

        </div>
    </>
}

export  default Inputs;