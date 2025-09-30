'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/posts', label: 'Посты' },
    { href: '/albums', label: 'Альбомы' },
    { href: '/profile', label: 'Профиль' },
]

export const Header: FC = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-black shadow-sm ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                pathname === item.href
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-text hover:border-text'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
