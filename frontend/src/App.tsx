import { useEffect, useState } from 'react';
import { QRCodeSVG } from "qrcode.react"
import { Profile } from "./components/organisms/Profile";
import { Modal } from "./components/molecules/Modal";
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const baseUrl = import.meta.env.VITE_BACKEND_URL;

type Props = {
  isVisitor: boolean;
}

function App({ isVisitor }: Props) {
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const [isMintModalOpen, setMintModalOpen] = useState(false);
  const [qrData, setQrData] = useState();
  const [createdHash, setCreatedHash] = useState('');
  const [isVerified, setVerified] = useState(false);
  const [isClaimModalOpen, setClaimModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function getQrCodeData() {
    const resp = await fetch(`${baseUrl}/api/sign-in`, {
      headers: {
        'ngrok-skip-browser-warning':true
      }
    });
    const json = await resp.json();
    setQrData(JSON.stringify(json));
  }

  async function createPOM() {
    setMintModalOpen(true);
    const resp = await fetch(`${baseUrl}/api/createPOM`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning':true
      }

    });
    const json = await resp.text();
    setCreatedHash(json);
  }

  async function onMint() {
    if(isVisitor) setClaimModalOpen(true);
    else {
      setCreatedHash('');
      createPOM();
    }
  }

  async function onVerifyModalClose() {
    setVerifyModalOpen(false);
    setVerified(true);
  }

  useEffect(() => {
    getQrCodeData();
  }, [])

  console.log(isVerifyModalOpen)

  return (
    <>
      <Profile onVerify={() => setVerifyModalOpen(true)} isVerified={isVerified} onMint={onMint} isVisitor={isVisitor} />
      <div className="ml-16">
      {(isVerifyModalOpen) &&
        <Modal onClose={onVerifyModalClose}>
          <p className="mb-16 font-bold">Scan with PolygonID</p>
          <QRCodeSVG value={qrData} width="450" height="450" level="L" bgColor="#000" fgColor="#e9e9e9" includeMargin/>
        </Modal>
      }
        {isMintModalOpen &&
        <Modal onClose={() => {
          setMintModalOpen(false);
          setClaimModalOpen(false);
        }
        }>
           <p>Success, transaction hash:</p>
          {createdHash ? (<p className="[overflow-wrap:anywhere]">{createdHash}</p>) : (<p>Loading...</p>)}
         </Modal>
        }
        {isClaimModalOpen &&
         <Modal onClose={() => setClaimModalOpen(false)}>
             <p className="text-gray-500 font-bold">
                    <label htmlFor="email" className="sr-only">
                      Position
                    </label>
                    <input
                      {...register('address', { required: true })}
                      className="block w-96 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                      placeholder="Enter your wallet adress"
                    />
                  </p>
                    <button
                      className={clsx(
                        "text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5",
                        !isValid && "opacity-50 cursor-not-allowed"
                      )}
                      type="submit"
                      onClick={handleSubmit(async () => {
                        setMintModalOpen(true)
                        await sleep(3000);
                        setCreatedHash('0xe4a0054f13d1e13750bf40a9a86d1425d5e718fd1a5b9e62f9d0fa66dba40b57')
                      })}
                    >
                       Submit 
                    </button>
         </Modal>
        }
      </div>
    </>
  )
}

export default App
