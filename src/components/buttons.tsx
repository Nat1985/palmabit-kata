import { Link } from "react-router-dom";

interface Button {
    children: string;
    link: string;
}

export const PrimaryButton = ({ children, link }: Button) => {
    return (
        <Link to={link}>
            <button
                className="
                            bg-[#CF675F]
                            hover:bg-[#C05C54]
                            text-white
                        " >
                {children}
            </button>
        </Link>
    )
}

export const SecondaryButton = ({ children, link }: Button) => {
    return (
        <Link to={link}>
            <button
                className="
                            border
                            border-[#CF675F]
                            hover:bg-[#FFF8F7]
                            text-[#CF675F]
                        " >
                {children}
            </button>
        </Link>
    )
}
