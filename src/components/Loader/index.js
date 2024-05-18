import { Loader } from '@mantine/core';
export default function MyLoader() {
    return (
        <div className='flex flex-col items-center justify-center my-20 mx-auto text-center'>
            <Loader size="xl" color="#3EAF76" />
        </div>
    )
}