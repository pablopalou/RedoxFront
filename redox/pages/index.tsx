import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from "react";
import Link from 'next/link';
import {useRouter} from 'next/router'
import { Layout } from '../components/Layout';


export const instance = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});


const Home: NextPage = () => {
  const [patients, setPatients] = useState([]);
  // traer los pacientes pero solo los mostrar los primeros 4 datos.
  const router = useRouter();

  useEffect(() => {
    console.log('entre');
    instance.get('/patients').then(
      (response) => {
        console.log(response.data.data);
        setPatients(response.data.data);
      }
    ).catch((error) => {
      console.log(error);
    });
  }, [])

  const addPatient = () => {
    router.push('/patient/new');
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout></Layout>

      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 w-full">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Get info about patients</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={addPatient}
            >
              Add new patient
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-5 place-content-center pt-8'>
        {patients.map((patient) => {
          return <div className='basis-1/3 pb-4 pl-6' key={patient.id}>
                  <h1> {patient.first_name}, {patient.last_name}</h1>
                  <p> {patient.ssn} </p>
                  <p> {patient.date_of_birth} </p>
                  <p> {patient.gender} </p>
                  <Link href={'/patient/'+patient.id} passHref><a className="text-blue-500 hover:text-blue-800">View more</a></Link>
                </div>
        })
        
        }
      </div>


    </div>
  )
}

export default Home
