import React, { useState, useEffect } from "react";
import TopBar from "./topBar/TopBar";
import Stats from "./stas/stats";
import RecentConversations from "./recentConversations/recentConversations";
import MessageBreakdown from "./messageBreakdown/messageBreakdown";
import Explore from "./explore/explore";
import AcvitivityOverniview from "./activityOverview/AvitivityOverniview";
import PhoneTop from "../../components/Phone/PhoneTop";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { openSidebar } = useOutletContext();
  const [conversations, setConversations] = useState([]);
  const [totalConversation, setTotalConversation]= useState(0);
  const [totalMessagesLength, setTotalMessagesLength] = useState(0)
  const [todayMessage, setTodayMessage] = useState(0)
  const [yesterdayMessage, setyesterdayMessage] = useState(0)
  const [weekMessage, setWeekMessage] = useState(0)


 
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const getMessagesLength = async ()=>{
      try{
        const res = await fetch(
        "http://localhost:5000/api/v1/messages/getMessageLength",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if(data.success){
        setTotalMessagesLength(data.totalMessages)
      }
      }catch(err){
        console.log(err)
      }
    }
    getMessagesLength();
  }, [token])


  useEffect(()=>{
    const getMessagesByTime = async ()=>{
      try{
        const res = await fetch(
        "http://localhost:5000/api/v1/messages/getMessagesByTime",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if(data.success){
        setTodayMessage(data.todayMessages)
        setyesterdayMessage(data.yesterdayMessages)
        setWeekMessage(data.weekMessages)

      }
      }catch(err){
        console.log(err)
      }
    }
    getMessagesByTime();
  }, [token])


   useEffect(() => {
      const loadConversationList = async () => {
        try {
          const res = await fetch(
            "http://localhost:5000/api/v1/conversations/getConversation",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const data = await res.json();
          setTotalConversation(data.length)
          setConversations(data || []);
        } catch (err) {
          console.error("Failed to load conversations", err);
        }
      };
  
      loadConversationList();
    }, [token]);

  return (
    <>
      <div className="md:hidden mb-4">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      <div className="min-h-screen bg-[#0D1424] text-white p-6 font-sans">
        {/* 1. Header Section */}
        <div className="mb-6 h-30">
          <TopBar />
        </div>

        {/* 2. Stats Row */}
        {/* This assumes your Stats component renders the 4 cards horizontally */}
        <div className="mb-6">
          <Stats
          totalConversationLength={totalConversation}
          totalMessagesLength={totalMessagesLength}
          />
        </div>

        {/* 3. Main Content Area (Split Layout) */}
        {/* Uses Grid: 3 parts total. Left takes 2 parts, Right takes 1 part */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10  ">
          {/* Left Column: Recent Conversations (Takes up 2/3 space) */}
          <div className="lg:col-span-2 ">
            {/* Remove fixed height, let content decide height or use min-h */}
            <div>
              <RecentConversations
                allConversations={conversations}
               />
            </div>
          </div>

          {/* Right Column: Stacked Widgets (Takes up 1/3 space) */}
          <div className="flex flex-col gap-6 lg:justify-center lg:h-full">
            {/* Top Right Widget: Activity Overview */}
            <div>
              <AcvitivityOverniview />
            </div>

            {/* Bottom Right Widget: Message Breakdown */}
            <div>
              <MessageBreakdown />
            </div>
          </div>
        </div>

        {/* 4. Bottom Banner */}
        <div>
          <Explore />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
