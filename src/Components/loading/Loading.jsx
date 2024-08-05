import { Oval } from "react-loader-spinner";

import "./loading.scss";

export default function Loading({ message }) {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#f1be43"
          secondaryColor="#e2e9e9"
          ariaLabel={message}
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <div className="loading__message">{message}</div>
    </div>
  );
}
