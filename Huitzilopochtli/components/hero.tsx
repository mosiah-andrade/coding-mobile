import logo from '../public/huitzilopochtli.ico'

function hero() {
    return (
        <div className="flex items-center justify-center m-7 p-4 bg-yellow-100 rounded-xl">
            <img src={logo} alt="Logo" width={75} />
            
            <h1 className="ml-4 text-4xl font-bold ">
                Huitzilopochtli
            </h1>
        </div>
    )
}

export default hero