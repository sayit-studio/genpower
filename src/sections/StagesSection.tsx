import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import GradientText from '../components/reactbits/GradientText'
import { asset } from '../utils/asset'

type ItemType = 'mission' | 'condition' | 'elimination'

interface StageItem {
  icon: string
  label: string
  text: string
  type: ItemType
}

interface Stage {
  id: number
  code: string
  name: string
  imageDesktop: string
  imageMobile: string
  quote: string
  description: string
  items: StageItem[]
}

const STAGES: Stage[] = [
  {
    id: 1,
    code: 'STAGE 01',
    name: '極速章魚燒',
    imageDesktop: asset('/assets/stages/stage-01-speed-desktop.png'),
    imageMobile: asset('/assets/stages/stage-01-speed-mobile.png'),
    quote: '滾燙出爐的 12 顆章魚燒，是美味還是考驗？在這裡，沒有細嚼慢嚥的空間！',
    description:
      '第一關拼的就是爆發力！面對剛出爐、內餡滾燙的黃金章魚燒，你必須克服高溫誘惑與恐懼。別管其他人吃到哪，用最快速度將盤面清空，搶下通往下一關的門票！',
    items: [
      { icon: '🎯', label: '闖關任務', text: '最快完食 12 顆原味章魚燒。', type: 'mission' },
      {
        icon: '⚖️',
        label: '晉級條件',
        text: '吞下最後一顆並「高舉你的手」，裁判確認盤面清空才算數。',
        type: 'condition',
      },
      {
        icon: '🏆',
        label: '殘酷淘汰',
        text: '僅取最快達成的前 18 名晉級，慢一秒只能明年再來！',
        type: 'elimination',
      },
    ],
  },
  {
    id: 2,
    code: 'STAGE 02',
    name: '極樂章魚燒',
    imageDesktop: asset('/assets/stages/stage-02-chaos-desktop.png'),
    imageMobile: asset('/assets/stages/stage-02-chaos-mobile.png'),
    quote: '真正的地獄才剛開始！18 進 9 的生存淘汰，當「命運障礙卡」降臨，誰能笑到最後？',
    description:
      '成功晉級的 18 位勇者同場廝殺！這次要面對的是整整 3 盒的重磅考驗，且全程禁止常規飲水。更刺激的是，突如其來的「趣味障礙卡」將徹底打亂你的節奏！是抽到「解渴神飲」上天堂，還是命中「芥末地獄」辣到懷疑人生？吃完不夠看，這關只留下最快的 9 個人——快人一步，才是活路。',
    items: [
      {
        icon: '🎯',
        label: '闖關任務',
        text: '限時內硬扛吃完 3 盒（36 顆）章魚燒。',
        type: 'mission',
      },
      {
        icon: '🔥',
        label: '刺激變數',
        text: '隨機觸發命運障礙！可能是地獄級的「芥末卡、冰火九重天、超級綜合口味」，或是幸運補給「漂浮可樂、奶茶卡」。',
        type: 'condition',
      },
      {
        icon: '🏆',
        label: '殘酷淘汰',
        text: '限時內吃完 3 盒者中，僅取最快完食的前 9 名晉級決賽；未完食或排名第 10 名後者，當場止步！若完食時間相同，以舉手停盤時間較早者勝出。',
        type: 'elimination',
      },
    ],
  },
  {
    id: 3,
    code: 'STAGE 03',
    name: '極限章魚燒',
    imageDesktop: asset('/assets/stages/stage-03-limit-desktop.jpg'),
    imageMobile: asset('/assets/stages/stage-03-limit-mobile.png'),
    quote: '忘掉飽足感，這裡只有無止盡的章魚燒狂潮！挑戰你以為的極限。',
    description:
      '來到最終戰，沒有終點，只有無限補盤的持續轟炸！晉級的 9 強將展開最終肉搏，考驗的是絕對的胃容量與驚人意志力。撐開你的胃，盡情吞噬吧！',
    items: [
      {
        icon: '🎯',
        label: '闖關任務',
        text: '章魚燒不間斷補給，時間內吃下最多顆！',
        type: 'mission',
      },
      {
        icon: '👑',
        label: '終極決戰',
        text: '結算時由裁判驗盤，盤數最多的前 3 名奪下大胃王霸主榮耀！（若盤數相同，則以最後一顆完食時間較早者勝出）',
        type: 'elimination',
      },
    ],
  },
]

const ITEM_ACCENT: Record<ItemType, string> = {
  mission: '#D4A017',
  condition: 'rgba(255,255,255,0.6)',
  elimination: '#E8590C',
}

function StageAccordionCard({
  stage,
  isOpen,
  onToggle,
  isMobile,
  delay,
}: {
  stage: Stage
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const imageSrc = isMobile ? stage.imageMobile : stage.imageDesktop

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* 圖片區塊 — 整張為點擊觸發 */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: 'pointer',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <img
          src={imageSrc}
          alt={stage.name}
          style={{
            display: 'block',
            width: '100%',
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      </div>

      {/* 箭頭指示條 — 置於文字區頂部，點擊亦可切換 */}
      <div
        onClick={onToggle}
        style={{
          cursor: 'pointer',
          background: '#111',
          textAlign: 'center',
          padding: '10px 0 6px',
          lineHeight: 1,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            color: '#D4A017',
            fontSize: '14px',
            transition: 'transform 0.4s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </div>

      {/* 手風琴展開區 */}
      <div
        style={{
          maxHeight: isOpen ? '900px' : '0',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
          background: '#111',
        }}
      >
        <div style={{ padding: '20px 20px 28px' }}>
          {/* 引言金句 */}
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: isMobile ? '14px' : '15px',
              fontStyle: 'italic',
              color: '#D4A017',
              lineHeight: 1.8,
              margin: '0 0 18px',
              borderLeft: '3px solid #D4A017',
              paddingLeft: '14px',
            }}
          >
            「{stage.quote}」
          </p>

          {/* 說明文字 */}
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: isMobile ? '13px' : '14px',
              color: '#e0e0e0',
              lineHeight: 1.8,
              margin: '0 0 20px',
            }}
          >
            {stage.description}
          </p>

          {/* 任務細項 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : `repeat(${stage.items.length}, 1fr)`,
              gap: '12px',
            }}
          >
            {stage.items.map((item) => (
              <div
                key={item.label}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  borderTop: `3px solid ${ITEM_ACCENT[item.type]}`,
                }}
              >
                <p
                  style={{
                    margin: '0 0 6px',
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    color: ITEM_ACCENT[item.type],
                    fontWeight: 700,
                  }}
                >
                  {item.icon} {item.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '13px',
                    color: '#e0e0e0',
                    lineHeight: 1.8,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StagesSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  // desktop: Set<id>；mobile: number | null（單張展開）
  const [openDesktop, setOpenDesktop] = useState<Set<number>>(new Set())
  const [openMobile, setOpenMobile] = useState<number | null>(null)

  function handleToggle(id: number) {
    if (isMobile) {
      setOpenMobile((prev) => (prev === id ? null : id))
    } else {
      setOpenDesktop((prev) => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    }
  }

  function isOpen(id: number) {
    return isMobile ? openMobile === id : openDesktop.has(id)
  }

  return (
    <section id="stages" style={{ padding: '120px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 標題區 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              color: '#CC1200',
              margin: '0 0 16px',
            }}
          >
            BATTLE STAGES
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '4px',
              margin: 0,
            }}
          >
            <GradientText text="三關極限考驗" />
          </h2>
        </div>

        {/* 卡片區 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {STAGES.map((stage, idx) => (
            <StageAccordionCard
              key={stage.id}
              stage={stage}
              isOpen={isOpen(stage.id)}
              onToggle={() => handleToggle(stage.id)}
              isMobile={isMobile}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
