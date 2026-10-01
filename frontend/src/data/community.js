// Mock community + gallery data. Replace with GET /api/community later.
const img = (id) => `https://images.unsplash.com/${id}?w=700&q=80`

export const communityChannels = [
  { id: 'ch1', name: 'Announcements', icon: '📣', description: 'New launches, restocks and important updates.' },
  { id: 'ch2', name: 'Charging Help', icon: '🔌', description: 'Ask questions about charging speed, compatibility and troubleshooting.' },
  { id: 'ch3', name: 'Deals', icon: '🏷️', description: 'Member-only discount drops and flash offers.' },
  { id: 'ch4', name: 'Product Discussion', icon: '💬', description: 'Compare notes with other members on real-world use.' },
  { id: 'ch5', name: 'Setup Showcase', icon: '🖥️', description: 'Share your desk, gaming or travel setup.' },
  { id: 'ch6', name: 'Customer Support', icon: '🛠️', description: 'Warranty and order help, directly from the HAMAR team.' },
  { id: 'ch7', name: 'Gaming Corner', icon: '🎮', description: 'Mobile gaming gear, grips and accessories talk.' },
  { id: 'ch8', name: 'Student Tech', icon: '🎓', description: 'Budget-friendly recommendations for student life.' },
  { id: 'ch9', name: 'Creator Zone', icon: '🎥', description: 'Charging and power setups for creators on the move.' },
]

export const communityPosts = [
  { id: 'cp1', channel: 'Setup Showcase', author: 'Tanvir A.', avatar: 'TA', title: 'My minimal charging station with the 65W GaN hub', likes: 142, replies: 18, time: '2h ago' },
  { id: 'cp2', channel: 'Deals', author: 'HAMAR Team', avatar: 'HM', title: 'Weekend flash offer: 15% off all power banks', likes: 310, replies: 44, time: '5h ago' },
  { id: 'cp3', channel: 'Charging Help', author: 'Nusrat J.', avatar: 'NJ', title: 'Is 20W wireless charging enough for daily use?', likes: 56, replies: 27, time: '1d ago' },
  { id: 'cp4', channel: 'Gaming Corner', author: 'Rakib H.', avatar: 'RH', title: 'Battery grip vs power bank for mobile gaming — thoughts?', likes: 88, replies: 33, time: '1d ago' },
  { id: 'cp5', channel: 'Student Tech', author: 'Farzana A.', avatar: 'FA', title: 'Best budget earbuds under 2000tk for online classes', likes: 121, replies: 41, time: '2d ago' },
  { id: 'cp6', channel: 'Announcements', author: 'HAMAR Team', avatar: 'HM', title: 'New arrivals: Smart Band 9 and Buds 3 Basic now live', likes: 205, replies: 19, time: '2d ago' },
  { id: 'cp7', channel: 'Creator Zone', author: 'Shakil M.', avatar: 'SM', title: 'My travel charging kit for content trips', likes: 97, replies: 15, time: '3d ago' },
  { id: 'cp8', channel: 'Product Discussion', author: 'Israt Z.', avatar: 'IZ', title: 'Anker vs UGREEN cables — durability after 6 months', likes: 76, replies: 29, time: '4d ago' },
  { id: 'cp9', channel: 'Customer Support', author: 'HAMAR Support', avatar: 'HM', title: 'Warranty claim process — quick guide pinned here', likes: 64, replies: 12, time: '5d ago' },
  { id: 'cp10', channel: 'Setup Showcase', author: 'Mehedi H.', avatar: 'MH', title: 'Desk tour: dual monitor + USB-C hub setup', likes: 133, replies: 22, time: '6d ago' },
]

export const galleryItems = [
  { id: 'g1', title: 'Minimal Desk Setup', category: 'Desk Setups', image: img('photo-1587614382346-4ec70e388b28') },
  { id: 'g2', title: 'Gaming Battle Station', category: 'Gaming Setups', image: img('photo-1592840062661-a5a7f78e2056') },
  { id: 'g3', title: 'Laptop Workspace', category: 'Laptop Setups', image: img('photo-1498050108023-c5249f4df085') },
  { id: 'g4', title: 'Bedside Charging Station', category: 'Charging Stations', image: img('photo-1583863788434-e58a36330cf0') },
  { id: 'g5', title: 'Travel Tech Kit', category: 'Travel Tech', image: img('photo-1553531384-cc64ac80f931') },
  { id: 'g6', title: 'Creator Filming Rig', category: 'Creator Setups', image: img('photo-1598550476439-6847785fcea6') },
  { id: 'g7', title: 'Dorm Room Setup', category: 'Desk Setups', image: img('photo-1522199755839-a2bacb67c546') },
  { id: 'g8', title: 'Mobile Gaming Rig', category: 'Gaming Setups', image: img('photo-1580327344181-c1163234e5a0') },
  { id: 'g9', title: 'Weekend Travel Charging', category: 'Travel Tech', image: img('photo-1495856458515-0637185db551') },
  { id: 'g10', title: 'Home Office Corner', category: 'Laptop Setups', image: img('photo-1593642632823-8f785ba67e45') },
]
