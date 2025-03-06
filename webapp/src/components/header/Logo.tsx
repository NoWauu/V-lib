export default function Logo() {
    return (
        <div className="flex justify-center items-center gap-4 select-none z-50">
            <img src="/logo.svg" alt="Logo" className="h-10 w-10" draggable={false} />
            <h1 className="text-2xl text-primary font-medium tracking-widest border-l-[1px] border-primary ps-3">V-LIB</h1>
        </div>
    );
}
