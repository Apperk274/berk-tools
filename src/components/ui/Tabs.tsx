import { ReactNode } from 'react'

interface Tab {
  id: string
  label: ReactNode
  badge?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export default function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`tw:bg-gray-800/50 tw:backdrop-blur-sm tw:p-3 tw:rounded-2xl tw:flex tw:gap-3 tw:shadow-lg tw:border tw:border-gray-700/50 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tw:flex-1 tw:px-6 tw:py-4 tw:rounded-xl tw:font-semibold tw:text-lg tw:transition-all tw:duration-200 tw:ease-out tw:relative ${
            activeTab === tab.id
              ? 'tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:text-white tw:shadow-md tw:shadow-blue-500/30 tw:scale-[1.02]'
              : 'tw:text-gray-400 tw:hover:text-gray-300 tw:hover:bg-gray-700/50'
          }`}
        >
          <span className="tw:flex tw:items-center tw:justify-center">
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="tw:ml-4 tw:px-4 tw:py-2 tw:bg-white/20 tw:rounded-full tw:text-sm tw:font-bold">
                {tab.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
