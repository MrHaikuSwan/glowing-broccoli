import Link from 'next/link';

const links = [
    { text: 'Home', href: '/dashboard'},
    { text: 'Payments', href: '/dashboard/payments' },
    { text: 'Vendors', href: '/dashboard/vendors' },
    { text: 'Approval Rules', href: '/dashboard/approval' },
]

export default function SideNav() {
    return (
        <div>
            <div>
                {/* Logo (top) */}
            </div>
            <div>
                {links.map((e) => <Link href={e.href}>{e.text}</Link>)}
            </div>
            <div>
                {/* User Profile (bottom) */}
            </div>
        </div>
    );
}