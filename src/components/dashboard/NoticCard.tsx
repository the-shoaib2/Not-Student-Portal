// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../ui/button';
// import { Camera, ArrowRight as ArrowRightIcon, Edit, Car } from 'lucide-react';
// import { StudentInfo } from '../../services/api';
// import { PhotographInfo } from '../../services/api';
// import Base64ImageCard from '../ImageView';
// import { Card, CardContent,CardTitle, CardHeader, CardFooter } from '../ui/card';



// const NoticCard ({ 
//   loading = { photograph: false },
//   useBase64Card = false
// }) => {


//   const getBase64Data = () => {
//     if (!photograph?.photoUrl) return { base64: '', format: 'jpeg' };
    
//     // Extract base64 and format from data URL
//     const match = photograph.photoUrl.match(/^data:image\/(\w+);base64,(.+)$/);
//     if (match) {
//       return { base64: match[2], format: match[1] };
//     }

//     return { base64: '', format: 'jpeg' }; 
//   };

//   return (
//     <Card className="flex flex-col items-center space-y-2">
//       <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg group">
//         {loading.photograph ? (
//           <div className="w-full h-full bg-gray-200 animate-pulse" />
//         ) : photograph?.photoUrl ? (
//           useBase64Card ? (
//             <Base64ImageCard 
//               base64Data={getBase64Data().base64} 
//               format={getBase64Data().format} 
//             />
//           ) : (
//             <img 
//               src={photograph.photoUrl}
//               className="w-full h-full object-cover"
//               crossOrigin="anonymous"
//               loading="lazy"
//               decoding="async"
//             />
//           )
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 space-y-2">
//             <Camera className="w-12 h-12 text-gray-400" />
//             <span>No Photo</span>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default ProfileCard;
