import { useState } from 'react'
import axios from 'axios';
const InputAddress = (props) => {
    const [zipcode, setZipcodeMain] = useState({
        main: "",
        sub: ""
    });
    const [address, setAddress] = useState({
        address1: "",
        address2: "",
        address3: ""
    });

    const addressChangeHandler = (num, e) => {

        if (num === 1) {
            setAddress({ ...address, address1: e })
            props.addressHandler({ ...address, address1: e, zipcode: zipcode.main + zipcode.sub })
        }
        if (num === 2) {
            setAddress({ ...address, address2: e })
            props.addressHandler({ ...address, address2: e, zipcode: zipcode.main + zipcode.sub })
        }
        if (num === 3) {
            setAddress({ ...address, address3: e })
            props.addressHandler({ ...address, address3: e, zipcode: zipcode.main + zipcode.sub })
        }

    }
    const updateZipcodeMain = (e) => {
        setZipcodeMain({ ...zipcode, main: e.target.value });
    };
    const updateZipcodeSub = async (e) => {
        setZipcodeMain({ ...zipcode, sub: e.target.value });
        if (e.target.value.length === 4 && zipcode.main.length === 3) {
            try {
                const res = await axios.get(
                    "https://zipcloud.ibsnet.co.jp/api/search",
                    {
                        params: {
                            zipcode: zipcode.main + e.target.value
                        }
                    }
                );
                if (res.data.results) {
                    const result = res.data.results[0];
                    setAddress((arr) => {

                        return {
                            ...arr,
                            address1: result["address1"],
                            address2: result["address2"],
                            address3: result["address3"]
                        }
                    }
                    )
                    props.addressHandler({
                        address1: result["address1"],
                        address2: result["address2"],
                        address3: result["address3"],
                        zipcode: zipcode.main + zipcode.sub

                    })
                }
            } catch {
                console.log("???????????????????????????????????????");
            }
        }
    };
    return (
        <div>
            <div className=" mb-4">
                <label htmlFor='postcode' className='block'>????????????</label>
                <input id='postcode' type="text" onChange={updateZipcodeMain} value={zipcode.main} className='w-16 inline-block border border-neutral-500 rounded-sm bg-slate-50 p-1' />
                <span> - </span>
                <input type="text" onChange={updateZipcodeSub} value={zipcode.sub} className='w-16 inline-block border border-neutral-500 rounded-sm bg-slate-50 p-1' />
            </div>
            <div>
                <div className=" mb-4">
                    <label htmlFor="address1">address1</label>
                    <input onChange={(e) => { addressChangeHandler(1, e.target.value) }} type="text" value={address.address1} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id="address1" name="address1" />
                </div>
                <div className=" mb-4">
                    <label htmlFor="address2">address2</label>
                    <input onChange={(e) => { addressChangeHandler(2, e.target.value) }} type="text" value={address.address2} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id="address2" name="address2" />
                </div>
                <div className=" mb-4">
                    <label htmlFor="address3">address3</label>
                    <input onChange={(e) => { addressChangeHandler(3, e.target.value) }} type="text" value={address.address3} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id="address3" name="address3" />
                </div>
            </div>
        </div>

    )
}

export default InputAddress
