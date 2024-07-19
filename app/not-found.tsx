import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='grid place-content-center h-screen text-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button className='bg-green-500 text-white rounded-xl hover:bg-green-500'>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}