import axios from "axios";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useState } from "react";

const NewPatientPage: NextPage = () => {
    const instance = axios.create({
        baseURL: 'http://localhost/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("male");
    const [ssn, setSsn] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(""); 

    const handleAddPatient = () => {
        instance.post('/patient', {first_name:firstName, last_name:lastName, gender:gender, ssn:ssn, date_of_birth:dateOfBirth, address:"no", phone:"no", email: "no"}).then(
            (response)=> {
                // setError(false);
                // setErrorMessage('');
                // setLoading(false);
                console.log(response);
                router.replace('/');
            }
        ).catch(
            (error)=> {
                console.log("error", error);
                // setLoading(false);
                // setError(true);
                // setErrorMessage(error.response.data.message);
            }
        )
    }

    return (
        <div className="w-full items-center flex flex-col">
            <div className="w-11/12 flex flex-col pt-4">
                <h3 className="text-bold text-2xl pb-3"> Create patient </h3>
                <p className="pb-10"> You must provide basic information to create a new patient</p>
                <div className="flex flex-col">
                    <label className="mb-2"> First Name </label>
                    <input className="mb-4 border-2 h-10 border-slate-300 rounded-lg w-1/4" type="text" value={firstName} placeholder={firstName} onChange={(event) => setFirstName(event.target.value)} required></input>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2"> Last Name </label>
                    <input className="mb-4 border-2 h-10 border-slate-300 rounded-lg w-1/4" type="text" value={lastName} placeholder={lastName} onChange={(event) => setLastName(event.target.value)} required></input>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2"> SSN </label>
                    <input className="mb-4 border-2 h-10 border-slate-300 rounded-lg w-1/4" type="text" value={ssn} placeholder={ssn} onChange={(event) => setSsn(event.target.value)} required></input>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Gender</label>
                    <select value={gender} className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/4" title="gender" name="gender" id="gender" onChange={(event:any) => {setGender(event.target.value)}}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Birth date:</label>
                    <input className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/4" type="date" id="start" name="trip-start" onChange={(event:any) => {setDateOfBirth(event.target.value); }}
                        value={dateOfBirth} placeholder=''
                        min="1900-01-01" max="2023-1-1"></input>
                </div>
                <button title='addPatientButton' type="button" onClick={handleAddPatient} className="disabled:bg-white mt-5 h-10 rounded-xl bg-blue-500 text-white w-1/4 mb-8"> 
                    Create
                </button>
            </div>
        </div>
    )
}

export default NewPatientPage