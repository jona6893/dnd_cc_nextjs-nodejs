

function FormSpell({ formSpell, setFormSpell }) {



  return (
    <div className="flex flex-col gap-2">
      <button className="flex gap-2 border-neonpurple-500 border p-1 rounded" onClick={()=>setFormSpell(!formSpell)}>
        Add Custom Spell
         <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 ${formSpell ? "rotate-180":"rotate-0"} duration-300 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
        />
      </svg>
      </button>
      {formSpell && 
      <form className="grid gap-2 mt-2 whitespace-nowrap">
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Name:
          <input
            className="bg-transparent w-full border-b border px-2 py-1"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Description:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Range:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Duration:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          At Higher level:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Concentration:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="checkmark"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Casting time:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <label htmlFor="" className="flex gap-2 justify-between items-center">
          Level:
          <input
            className="bg-transparent border-b border px-2 py-1 w-full"
            type="text"
          />
        </label>
        <button>add spell</button>
      </form>}
    </div>
  );
}

export default FormSpell