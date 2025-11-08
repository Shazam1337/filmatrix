import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProjectHero from '@/components/ProjectHero'
import ProjectAbout from '@/components/ProjectAbout'
import ProjectMetrics from '@/components/ProjectMetrics'
import ProjectDocuments from '@/components/ProjectDocuments'
import ProjectTeam from '@/components/ProjectTeam'
import ProjectRoadmap from '@/components/ProjectRoadmap'
import ProjectSignal from '@/components/ProjectSignal'
import Footer from '@/components/Footer'
import { Project } from '@/types'

const mockProjects: Record<string, Project> = {
  '1': {
    id: '1',
    name: 'NEURALINK PROTOCOL',
    description: 'Decentralized AI compute network with verifiable inference',
    volume: 1250000,
    ctr: 15.2,
    velocity402: 88,
    status: 'OPEN',
    about: 'Neuralink Protocol is a decentralized AI compute network that enables verifiable inference through on-chain proof systems. The platform connects AI model providers with compute resources while maintaining transparency and verifiability of all operations.',
    team: [
      { name: 'Alex Chen', role: 'Founder & CEO', bio: 'Former ML engineer at Google DeepMind' },
      { name: 'Sarah Kim', role: 'CTO', bio: 'Blockchain architect, ex-Consensys' },
      { name: 'Marcus Rivera', role: 'Head of Research', bio: 'PhD in Distributed Systems' },
    ],
    roadmap: [
      { quarter: 'Q1 2024', milestone: 'Mainnet launch' },
      { quarter: 'Q2 2024', milestone: 'First 1000 nodes' },
      { quarter: 'Q3 2024', milestone: 'API v2 release' },
      { quarter: 'Q4 2024', milestone: 'Cross-chain integration' },
    ],
  },
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = mockProjects[params.id]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProjectHero project={project} />
      {project.about && <ProjectAbout about={project.about} />}
      <ProjectMetrics projectId={project.id} />
      <ProjectDocuments />
      {project.team && <ProjectTeam team={project.team} />}
      {project.roadmap && <ProjectRoadmap roadmap={project.roadmap} />}
      <ProjectSignal projectId={project.id} />
      <Footer />
    </main>
  )
}

