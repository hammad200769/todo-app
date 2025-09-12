import { OtpInput } from 'reactjs-otp-input';

type OTPFieldProps = {
  otp: string;
  setOtp: (otp: string) => void;
};

function OTPField({ otp, setOtp }: OTPFieldProps) {
  return (
    <div className='flex-cc mx-auto'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        separator={<span className='m-1'></span>}
        inputStyle={{
          border: '1px solid black',
          width: '35px',
          height: '40px',
        }}
      />
    </div>
  );
}

export default OTPField;
