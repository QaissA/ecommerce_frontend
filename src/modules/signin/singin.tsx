import Scene from "@/components/scene"

const SignIn = () => {
  return (
    <div className="flex flex-row h-[100vh]">
        <div className="w-2/3 p-4 bg-blue-200">
        </div>
        <div className="w-1/3 p-4 bg-blue-400">
          <Scene />
        </div>
    </div>
  )
}

export default SignIn