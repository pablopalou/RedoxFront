
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
    // see if procedures is ok. 
    const router = useRouter();
    const { query = {} } = router || {};
    const { id = 0 } = query || {};
    // let idPatient = router.query.id as string;
    const [patient, setPatient] = useState();
    const [patientDetails, setPatientDetails] = useState();
    // const [allergies, setAllergies] = useState([]);
    // const [encounters, setEncounters] = useState([]);
    // const [inmunization, setInmunization] = useState([]);
    // const [medications, setMedications] = useState([]);
    // const [planOfCare, setPlanOfCare] = useState([]);
    // const [problems, setProblems] = useState([]);
    // const [procedures, setProcedures] = useState([]);
    // const [result, setResult] = useState([]);
    // const [vitalSigns, setVitalSigns] = useState([]);

    // this call to the api is normal to timeout so maybe we can set error and do the useeffect again if it was an error. 
    useEffect(() => {
        if (id){
            instance.get(`/patientDetail/${id}`).then(
                (response: any) => {
                    // console.log("Submission:", response.data.data);
                    console.log(response.data);
                    setPatientDetails(response.data);
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
        } else {
            console.log("renderizar otra vez");
        }
    }, [id])


    const propertyGender = (gender: string | undefined) => {
        if (gender) {
            return gender.charAt(0).toUpperCase() + gender.slice(1);
        }
        return "";
    }
    //poner que si no tiene documentos, solo devuelva la info personal y chau.
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
            <div className='pt-4 flex flex-col w-11/12 min-w-11/12'>
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
                        </table>): <p>{patientDetails?.AllergyText}</p> }
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
                        </table>): <p>{patientDetails?.EncountersText}</p> }
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
                        </table>): <p>{patientDetails?.ImmunizationsText}</p> }
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
                        </table>): <p>{patientDetails?.MedicationsText}</p> }
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
                        {patientDetails?.Procedures.Procedures && patientDetails?.Procedures.Procedures.length > 0 ? (
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
                        </table>): <p>{patientDetails?.ProceduresText}</p> }
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
                        </table>): <p>{patientDetails?.ProblemsText}</p> }
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
                        {patientDetails?.Results?.Producer?.Observations && patientDetails?.Results?.Producer?.Observations.length > 0 ? (
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
                            {patientDetails?.Results?.Producer?.Observations.map((result)=>
                                <tr key={result}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{result.DateTime}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{result.Name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{result.Code}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>): <p>{patientDetails?.ResultText}</p> }
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
                        {patientDetails?.VitalSigns[0].Observations && patientDetails?.VitalSigns[0].Observations.length > 0 ? (
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
                        </table>): <p>{patientDetails?.VitalSignsText}</p> }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        // <Layout>
        //     <div className='w-full flex justify-center pb-10'>
        //         <div className='w-11/12 flex flex-col mt-10'>
        //             <Link href={routes.home} passHref><a className="text-blue-500 hover:text-blue-800 mb-8"> <img src="../icons/backarrow.svg" alt="" /></a></Link>
        //             {/* div for id, status and doctor*/}
        //             <div className='flex flex-col mb-4 border-b-2 pb-4'>
        //                 <div className='flex items-center mb-2'>
        //                     <h4 className='pr-4 mb-0 w-1/5'>{`Submission: ${submission?.id}`}</h4>
        //                     <div className='w-1/6'>{<AnyTag status={submission?.state}></AnyTag>}</div>
        //                     {submission?.patient.id == id &&
        //                         <div className='flex w-full justify-end'>
        //                             <Popup className="" trigger={<button className='w-32 h-8 rounded-xl bg-red-100 text-red-800'>Delete</button>}
        //                                 position="left center">
        //                                 <div className="flex flex-col items-center">
        //                                     <h5>Are you sure you want to delete this submission? </h5>
        //                                     <p>If you want to cancel, click outside the pop up</p>
        //                                     <button className='w-32 h-8 rounded-xl bg-red-100 text-red-800' onClick={handleDelete}>Yes, delete</button>
        //                                 </div>
        //                             </Popup>
        //                         </div>
        //                     }
        //                     {submission?.doctor?.id == id &&
        //                         <div className='flex w-full justify-end'>
        //                             <input title="a" placeholder="" type="file" onChange={onFileChange} />
        //                             <button className='w-48 h-8 rounded-xl bg-gray-100 text-gray-800' onClick={uploadPrescription}>Upload Prescription</button>
        //                         </div>
        //                     }
        //                 </div>
        //                 {submission?.doctor ? <div>Assigned doctor: {submission?.doctor?.name}. Grade: {submission.doctor.doctorInformation.grade}. Speciality: {submission.doctor.doctorInformation.speciality}</div> : <div>A doctor will take this submission soon</div>}
        //             </div>

        //             {/* patient info */}
        //             <div className='flex flex-col mb-4'>
        //                 <h5> Patient Information:</h5>
        //                 <ShowInformation title1="Email" title2='Name' property1={submission?.patient.email} property2={submission?.patient.name}></ShowInformation>
        //                 <ShowInformation title1="Birth" title2='Gender' property1={submission?.patient.patientInformation.birth} property2={propertyGender(submission?.patient.patientInformation.gender)}></ShowInformation>
        //                 <ShowInformation title1="Height" title2='Weight' property1={submission?.patient.patientInformation.height} property2={submission?.patient.patientInformation.weight}></ShowInformation>

        //                 <div className=' mb-3'>
        //                     <p> Diseases </p>
        //                     <div>{submission?.patient.patientInformation.diseases}</div>
        //                 </div>
        //                 <div>
        //                     <p> Previous treatments </p>
        //                     <div>{submission?.patient.patientInformation.previous_treatments}</div>
        //                 </div>
        //             </div>

        //             {/* symptoms */}
        //             <div className='flex flex-col mb-4'>
        //                 <h5 className='mb-0'> Symptoms </h5>
        //                 <div className='flex'>
        //                     <p className='mr-4'> {submission?.symptoms}</p>
        //                     {submission?.state == "pending" && submission?.patient.id == id &&
        //                         <button className='w-40 rounded-xl bg-blue-100 text-blue-800' onClick={handleEdit}>Edit symptoms</button>
        //                     }
        //                 </div>
        //             </div>
        //             {/* prescriptions */}
        //             <div className='flex flex-col w-full'>
        //                 <h5 className='mb-0'> Prescriptions </h5>
        //                 {submission?.prescriptions ?
        //                     (<div className='bg-gray-200 py-3 flex pl-4'>
        //                         <a onClick={() => {handleDownload(submission?.prescriptions)}} className="pr-10 text-blue-500 hover:text-blue-800"> Download your prescription</a>
        //                         {submission?.doctor?.id == id &&
        //                             <Popup className="" trigger={<button className='w-24 h-6 rounded-xl bg-red-100 text-red-800'>Delete</button>}
        //                                 position="left center">
        //                                 <div className="flex flex-col items-center">
        //                                     <h5>Are you sure you want to delete this prescription? </h5>
        //                                     <p>If you want to cancel, click outside the pop up</p>
        //                                     <button className='w-32 h-8 rounded-xl bg-red-100 text-red-800' onClick={handleDeletePrescription}>Yes, delete</button>
        //                                 </div>
        //                             </Popup>
        //                         }
        //                     </div>) :
        //                     (<div className='bg-gray-200 py-3 flex pl-4 '>
        //                         <img src="../icons/notavailable.svg" alt="" />
        //                         <p className='text-lg pl-3'>No prescriptions have been added yet</p>
        //                     </div>)
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </Layout>
    )
}

export default PatientDetailPage