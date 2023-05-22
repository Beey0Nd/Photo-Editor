interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
    return (
        <div className="layout">
            <div>
                {children}
            </div>
        </div>
    );
}
export default Layout;