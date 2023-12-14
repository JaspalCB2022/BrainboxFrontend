import { theme } from "../Theme"


let AppIcon = () => {
    return (
        <svg width="25" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.76367 30.6047C9.23001 30.6047 8.78268 30.4242 8.42168 30.0632C8.06068 29.7021 7.88018 29.2548 7.88018 28.7212V24.9542H32.3656V8.0027H36.1326C36.6663 8.0027 37.1136 8.18321 37.4746 8.54421C37.8356 8.90521 38.0161 9.35254 38.0161 9.8862V38.1386L30.4821 30.6047H9.76367ZM0.346191 28.7212V2.35222C0.346191 1.81856 0.526693 1.37123 0.887697 1.01022C1.2487 0.649221 1.69603 0.468719 2.22969 0.468719H26.7151C27.2488 0.468719 27.6961 0.649221 28.0571 1.01022C28.4181 1.37123 28.5986 1.81856 28.5986 2.35222V19.3037C28.5986 19.8373 28.4181 20.2847 28.0571 20.6457C27.6961 21.0067 27.2488 21.1872 26.7151 21.1872H7.88018L0.346191 28.7212ZM24.8316 17.4202V4.23571H4.11318V17.4202H24.8316Z" fill={theme.colors.primary} />
        </svg>
    )
}

export default AppIcon