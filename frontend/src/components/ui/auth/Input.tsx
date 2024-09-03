export interface get_input_dto {
    id: string
    name: string
    type: string
    boolean: boolean
    place: string
    register: any
}

export function Input({ boolean, type, id, name, place, register }: get_input_dto) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            required={boolean}
            placeholder={place}
            {...register(name)}// Conectando el input con react-hook-form
            className="block w-full appearance-none rounded-md border border-input bg-zinc-100 px-3 py-2  shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        />
    )
}