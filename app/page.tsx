import Image from 'next/image'
import avatar from 'public/Avatar.jpg'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={avatar}
          width={100}
          height={100}
          alt="Avatar"
          className="animate-in grayscale rounded-full"
          style={{ '--index': 1 } as React.CSSProperties}
        />
        <div className="space-y-2 text-center">
          <h1
            className="animate-in text-2xl font-bold leading-snug tracking-tight"
            style={{ '--index': 2 } as React.CSSProperties}
          >
            Fauzira Alpiandi
          </h1>
          <p
            className="animate-in text-neutral-200 leading-tight tracking-normal my-4"
            style={{ '--index': 3 } as React.CSSProperties}
          >
            It&lsquo;s a multifaceted creative with expertise in frontend
            development, artwork, and writing.
          </p>
        </div>
      </div>
    </div>
  )
}
