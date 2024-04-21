import { TiTick } from "react-icons/ti";
import LoadingMasterClass from "../../../_common/visuals/loading/LoadingMasterClass";
import { useEffect, useState } from "react";
import { auth } from "../../../../firebase";
import { getUserProfile } from "../../../../api/settings/settings";
import { checkMasterClassMembership } from "../../../../api/membership/membership";
import { checkoutMasterClass } from "../../../../api/payment/payment";

interface PriceProps {
  normalPrice?: string;
  discountedPrice: string;
  hasMembership: boolean;
}

const PriceComponent: React.FC<PriceProps> = ({
  discountedPrice,
  hasMembership,
}) => (
  <div
    className={`flex w-full justify-between ${hasMembership ? "opacity-50" : ""}`}
  >
    <div className="flex flex-col gap-2">
      <h3 className="text-[1.0em] font-semibold text-gray-600">
        Preço de Lançamento:
      </h3>
      <h1 className="text-4xl underline">{discountedPrice}</h1>
    </div>
    {hasMembership && (
      <div className=" flex size-24 rotate-12 items-center justify-center rounded-full bg-indigo-500 p-4 text-center text-sm text-white">
        Comprado!
      </div>
    )}
  </div>
);

interface BulletPointProps {
  text: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ text }) => (
  <div className="flex w-full items-center gap-4">
    <TiTick className="size-7 animate-jump text-indigo-500 " />
    <li className="flex w-full items-center gap-3 text-sm">{text}</li>
  </div>
);

interface PurchaseButtonProps {
  handleClick: () => void;
  loading: boolean; // Add a loading prop
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  handleClick,
  loading,
}) => (
  <div
    className={`mb-4 flex w-full justify-center ${loading ? "animate-pulse" : ""}`}
  >
    <div
      onClick={handleClick}
      className={`flex w-52 transform cursor-pointer items-center justify-center rounded-full border border-gray-400 py-4 transition duration-500 hover:scale-110 hover:border-transparent  hover:bg-indigo-500 hover:text-white ${loading ? " scale-110 border-transparent bg-indigo-500 text-white" : ""}`} // Apply loading class
    >
      <div className="flex items-center justify-center gap-8">
        {loading ? (
          <div className=" animate-fade">
            <svg
              aria-hidden="true"
              className=" h-6 w-6 animate-spin  fill-indigo-500 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <p className="text-base">Comprar Agora</p>
        )}
      </div>
    </div>
  </div>
);

interface MasterClassProps {
  hasMembership: boolean | null;
  normalPrice: string;
  discountedPrice: string;
  bulletPoints: string[];
}

const MasterClassCard: React.FC<MasterClassProps> = ({
  normalPrice,
  discountedPrice,
  bulletPoints,
}) => {
  const [hasMembership, setHasMembership] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const handlePayment = async () => {
    setLoading(true); // Set loading to true when payment is initiated
    try {
      const userProfile = await getUserProfile();
      const user = auth.currentUser;
      console.log(user);
      try {
        const body = {
          customerName:
            userProfile.data.firstName! + " " + userProfile.data.lastName!,
          customerEmail: user?.email!,
        };
        console.log(body);
        const stripeLink = await checkoutMasterClass(body);
        if (stripeLink) {
          window.open(stripeLink.data!, "_self")
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after payment attempt
    }
  };


  const checkMasterClass = async () => {
    const checkMasterClass = await checkMasterClassMembership();

    if (checkMasterClass.data?.membershipUsersLogId) {
      setHasMembership(true);
    } else {
      setHasMembership(false);
    }
  };

  useEffect(() => {
    checkMasterClass();
  }, []);

  if (hasMembership === null) {
    return <LoadingMasterClass />;
  }

  return (
    <div
      className={`flex min-w-32 flex-col gap-14 rounded-xl border-2 border-gray-300 px-10 py-7 text-gray-700 xl:w-1/2 ${hasMembership ? "opacity-50" : ""} duration-250 ease-in-out animate-in fade-in slide-in-from-left-10`}
    >
      <PriceComponent
        normalPrice={normalPrice}
        discountedPrice={discountedPrice}
        hasMembership={hasMembership}
      />
      <div className="flex flex-col gap-5">
        {bulletPoints.map((point, index) => (
          <BulletPoint key={index} text={point} />
        ))}
      </div>
      {!hasMembership && (
        <PurchaseButton handleClick={handlePayment} loading={loading} />
      )}
    </div>
  );
};

export default MasterClassCard;