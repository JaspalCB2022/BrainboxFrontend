import React from 'react';
import { RadioButton } from '../../_atom/RadioButton/index';

interface RoleToggleProps {
    activeRole: string;
    onRoleChange: (role: string) => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ activeRole, onRoleChange }) => (
    <div>
        <RadioButton
            label="User"
            checked={activeRole === 'Users'}
            onChange={() => onRoleChange('Users')}
        />
        <RadioButton
            label="Roles"
            checked={activeRole === 'Roles'}
            onChange={() => onRoleChange('Roles')}
        />
    </div>
);

export default RoleToggle;
