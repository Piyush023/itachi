import AccountContent from '../components/Account/AccountContent';
import Header from '../components/Header/Header';

const Account = () => {
  return (
    <div className='bg-neutral-900 rounded-lg h—full w—full overflow-hidden overflow-y-auto'>
      <Header className='from-bg—neutral-900'>
        <div className='mb-2 flex flex—-col gap-y-6'>
          <h1 className='Mtext-white text-3x1 font-semibold'>
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};
export default Account;
