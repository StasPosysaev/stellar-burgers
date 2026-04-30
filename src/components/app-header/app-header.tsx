import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import styles from '../ui/app-header/app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const setActiveClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.link_active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={setActiveClass}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink to='/feed' className={setActiveClass}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>

        <NavLink to='/' className={styles.logo}>
          <Logo className='' />
        </NavLink>

        <div className={styles.link_position_last}>
          <NavLink to='/profile' className={setActiveClass}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  {user?.name || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
