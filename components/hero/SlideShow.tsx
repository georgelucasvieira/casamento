export default function SlideShow() {
    return (
        <div className='fixed top-0 left-0 w-full h-screen overflow-hidden -z-5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-[42.5%]'>
            <div className='relative -z-2 h-screen w-full'>
                <img src='/images/PTF-6.jpg' className="absolute h-full w-full inset-0 object-cover object-center
                 bg-transparent opacity-100"/>
            </div>
        </div>
    )
}
