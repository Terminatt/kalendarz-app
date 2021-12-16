import React, { useState } from 'react';

import './Navigation.less';

const Navigation: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return isLogged ? (
        <nav>Test</nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    );
};

export default Navigation;
