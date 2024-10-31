import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

const ChildrenNamePage = ({
  nickname,
  setNickname,
  reasonName,
  setReasonName,
  errors,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nickname:", nickname);
    console.log("Reason:", reason);

    // You can send the data to a server here
  };

  return (
    <>
      <div className="w-full h-full py-20">
        <div className="text-center md:mx-10">
          <div className="flex justify-center mb-8">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          {/* Nickname Input */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Hi! Please call me</h1>
            {errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname}</p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-underline mb-8 bg-transparent"
              required
            />

            {/* Reason for Nickname Input */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">People love me for…</h2>
              {errors.reasonName && (
                <p className="text-red-500 text-sm">{errors.reasonName}</p>
              )}
            </div>

            <input
              type="text"
              name="nicknameReason"
              value={reasonName}
              onChange={(e) => setReasonName(e.target.value)}
              className="input-underline mb-8 bg-transparent"
              required
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChildrenNamePage;
