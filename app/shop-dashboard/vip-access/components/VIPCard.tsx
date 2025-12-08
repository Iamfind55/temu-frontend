import { Crown, Check, Sparkles } from "lucide-react"
import { VIPLevel } from "./types"

interface VIPCardProps {
   level: VIPLevel
}

export function VIPCard({ level }: VIPCardProps) {
   const isLight = level.isLightHeader

   return (
      <div
         className={`cursor-pointer relative bg-white rounded-lg border ${level.borderColor} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
      >
         <div className={`${isLight ? level.color : `bg-gradient-to-r ${level.color}`} p-6`}>
            <div className="flex items-center gap-3 mb-2">
               <div className={`w-10 h-10 ${isLight ? level.headerIconBg : "bg-white/20"} rounded-full flex items-center justify-center`}>
                  <Crown className={`h-5 w-5 ${isLight ? level.iconColor : "text-white"}`} />
               </div>
               <div>
                  <h3 className={`text-lg font-bold ${isLight ? level.headerTextColor : "text-white"}`}>{level.name}</h3>
                  <p className={`text-sm ${isLight ? level.headerSubTextColor : "text-white/80"}`}>Exclusive Membership</p>
               </div>
            </div>
         </div>

         <div className={`${level.bgColor} p-4 grid grid-cols-2 gap-3`}>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Deposit Required</p>
               <p className={`font-bold ${level.textColor}`}>{level.deposit}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Reward</p>
               <p className={`font-bold ${level.textColor}`}>{level.reward}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Profit Point</p>
               <p className={`font-bold ${level.textColor}`}>{level.profitPoint}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Daily Traffic</p>
               <p className={`font-bold ${level.textColor}`}>{level.dailyTraffic}</p>
            </div>
         </div>

         <div className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
               <Sparkles className={`h-4 w-4 ${level.iconColor}`} />
               Benefits Include
            </h4>
            <ul className="space-y-3">
               {level.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                     <div className={`flex-shrink-0 w-5 h-5 rounded-full ${level.bgColor} flex items-center justify-center mt-0.5`}>
                        <Check className={`h-3 w-3 ${level.iconColor}`} />
                     </div>
                     <span className="text-sm text-gray-600">{feature}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
