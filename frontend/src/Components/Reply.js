import moment from "moment";
import React from "react";

const Reply = ({ reply }) => {
  return (
    <div key={reply._id}>
      <div className="bg-gray-300 rounded-md text-gray-600 p-2 pt-1 my-2">
        <div className="bg-purple-500 rounded-full inline-block px-2 py-1 text-white ">
          Reply
        </div>
        <p className="bg-gray-200 rounded px-2 py-1">{reply.reply}</p>
        <small>{moment(reply.createdAt).startOf().fromNow()}</small>
      </div>
    </div>
  );
};

export default Reply;
