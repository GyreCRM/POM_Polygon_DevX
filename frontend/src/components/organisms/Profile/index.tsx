import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

type Props = {
  onVerify: () => void;
  isVerified: boolean;
  onMint: () => void;
  isVisitor: boolean;
}

export function Profile({ onVerify, isVerified, onMint, isVisitor }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  return (
    <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-3">
                <div></div>
                <div className="relative mb-10">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        {(isVerified || isVisitor) && <CheckBadgeIcon className="h-16 w-16 absolute bottom-2 -right-2" />}
                    </div>
                </div>
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                  <button
                      className="text-white py-2 px-4 uppercase rounded bg-gray-800 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    onClick={onMint}
                  >
                      {isVisitor ? "Claim POM" : "Mint POM"}
                  </button>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center pb-12">
                <h1 className="text-4xl font-medium text-gray-700">Jessica Jones, <span class="font-light text-gray-500">27</span></h1>

                {isVisitor ? 
                 <p className="mt-8 mb-2">Senior Blockchain Developer</p>
                :
                <>
                 <p className="mt-8 mb-2">Input your position and organisation</p>
                <form onSubmit={handleSubmit(() => onVerify())}>
                <div className="flex items-center mb-8">
                  <p className="text-gray-500 font-bold">
                    <label htmlFor="email" className="sr-only">
                      Position
                    </label>
                    <input
                      {...register('position', { required: true })}
                      className="block w-96 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Senior Blockchain Developer"
                    />
                  </p>
                  <p className="mx-2 font-bold">at</p>
                  <p className="text-gray-500 font-bold">
                    <label htmlFor="email" className="sr-only">
                      Position
                    </label>
                    <input
                      {...register('organisation', { required: true })}
                      className="block w-96 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Gyre"
                    />
                  </p>
                </div>
                <div className="flex justify-center">
                    <button
                      className={clsx(
                        "text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5",
                        !isValid && "opacity-50 cursor-not-allowed"
                      )}
                      type="submit"
                    >
                        Verify with PolygonId
                    </button>
                </div>
                </form>
                </>
                }
            </div>
        </div>
    </div>
    )
}
