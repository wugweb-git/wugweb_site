import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Profile = { segment: string | null; preferences: Record<string, unknown> } | null;

export default function Hero() {
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    // Client-side fetch keeps the shell of the page static/cacheable —
    // only this fragment depends on the personalization read.
    fetch('/api/personalize')
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1>{profile?.segment ? `Welcome back, ${profile.segment}` : 'We build digital experiences.'}</h1>
    </motion.section>
  );
}
