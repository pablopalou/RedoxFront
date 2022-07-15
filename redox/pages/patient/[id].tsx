
import { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'

const PatientDetailPage = () => {
    const instance = axios.create({
        baseURL: 'http://localhost/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    // put loading sign
    const router = useRouter();
    const { query = {} } = router || {};
    const { id = 0 } = query || {};
    // let idPatient = router.query.id as string;
    const [patient, setPatient] = useState();
    const [patientDetails, setPatientDetails] = useState();
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        if (id){
            instance.get(`/patientDetail/${id}`).then(
                (response: any) => {
                    console.log(response.data);
                    setPatientDetails(response.data);
                    // console.log(response.data.Meta.Errors.length);
                    setNoData(response.data.Meta.Errors.length > 0 ? true : false);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
            instance.get(`patient/${id}`).then(
                (response) => {
                    console.log(response.data.data);
                    setPatient(response.data.data);
                }
            )
        }
    }, [id])

    return (
        <div className='flex flex-col items-center pt-10'>
            <div className='w-11/12'>
                <h3 className='underline text-bold'>Personal information</h3>
                <div className='flex place-content-between pt-6'>
                    <div className='flex flex-col'>
                        <p> Name </p>
                        <p> {patient?.first_name}, {patient?.last_name} </p>
                    </div>
                    <div className='flex flex-col'>
                        <p> Date of birth </p>
                        <p> {patient?.date_of_birth}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p> SSN </p>
                        <p> {patient?.ssn} </p>
                    </div>
                    <div className='flex flex-col'>
                        <p> Gender </p>
                        <p> {patient?.gender} </p>
                    </div>
                    <div className='flex flex-col'>
                        <p> Email </p>
                        <p> {patient?.email} </p>
                    </div>
                </div>
            </div>
            {noData ? 
            (<div>
                <p className='text-bold text-xl pt-8 text-blue'> This patient does not have any documents. </p>
            </div>) :
            
            (
            <><div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Allergies </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Allergies && patientDetails?.Allergies.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Allergies.map((encounter)=>
                                <tr key={encounter}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{encounter.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.EndDateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.Type.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.Type.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.AllergyText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Encounters </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Encounters && patientDetails?.Encounters.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Encounters.map((encounter)=>
                                <tr key={encounter}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{encounter.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.EndDateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.Type.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{encounter.Type.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.EncountersText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Immunizations </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Immunizations && patientDetails?.Immunizations.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Immunizations.map((immunization)=>
                                <tr key={immunization}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{immunization.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{immunization.Product.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{immunization.Product.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.ImmunizationsText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Medications </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Medications && patientDetails?.Medications.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Medications.map((medication)=>
                                <tr key={medication}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{medication.StartDate}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.EndDate}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.Product.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.Product.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.MedicationsText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Procedures </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Procedures?.Procedures && patientDetails?.Procedures?.Procedures?.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Procedures.Procedures.map((procedure)=>
                                <tr key={procedure}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{procedure.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{procedure.EndDateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{procedure.Type.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{procedure.Type.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.ProceduresText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Problems </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Problems && patientDetails?.Problems.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Problems.map((problem)=>
                                <tr key={problem}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{problem.StartDate}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{problem.EndDate}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{problem.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{problem.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.ProblemsText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
                <p className='text-bold text-xl'> Results </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.Results?.[0]?.Observations && patientDetails?.Results?.[0]?.Observations.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.Results?.[0].Observations.map((result)=>
                                <tr key={result}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{result.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{result.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{result.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.ResultText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12 pb-8'>
                <p className='text-bold text-xl'> Vital Signs </p>
                <div className="mt-3 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {patientDetails?.VitalSigns?.[0].Observations && patientDetails?.VitalSigns?.[0].Observations.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Start
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stop
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Code
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Value
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {patientDetails?.VitalSigns[0].Observations.map((vitalSign)=>
                                <tr key={vitalSign}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{patientDetails?.VitalSigns[0].DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vitalSign.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vitalSign.Code}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vitalSign.Value}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p className='text-center'>{patientDetails?.VitalSignsText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div></>)
            }
        </div>
    )
}

export default PatientDetailPage