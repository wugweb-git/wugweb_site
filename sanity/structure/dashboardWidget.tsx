import { DashboardWidget } from '@sanity/dashboard';
import { Card, Text, Stack, Badge, Button } from '@sanity/ui';
import { useClient } from 'sanity';

const ContentStatsWidget = () => {
  const client = useClient();

  const [stats, setStats] = React.useState({
    caseStudies: 0,
    posts: 0,
    services: 0,
    clients: 0,
    team: 0,
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [caseStudies, posts, services, clients, team] = await Promise.all([
          client.fetch('count(*[_type == "caseStudy"])'),
          client.fetch('count(*[_type == "post"])'),
          client.fetch('count(*[_type == "service"])'),
          client.fetch('count(*[_type == "client"])'),
          client.fetch('count(*[_type == "person"])'),
        ]);
        setStats({ caseStudies, posts, services, clients, team });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, [client]);

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={3}>
        <Text size={1} weight="bold">
          Content Overview
        </Text>
        <Stack space={2}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size={1}>Case Studies</Text>
            <Badge tone="primary">{stats.caseStudies}</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size={1}>Blog Posts</Text>
            <Badge tone="primary">{stats.posts}</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size={1}>Services</Text>
            <Badge tone="primary">{stats.services}</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size={1}>Clients</Text>
            <Badge tone="primary">{stats.clients}</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size={1}>Team Members</Text>
            <Badge tone="primary">{stats.team}</Badge>
          </div>
        </Stack>
        <Button
          text="View All Content"
          mode="ghost"
          onClick={() => {
            window.location.href = '/desk';
          }}
        />
      </Stack>
    </Card>
  );
};

export default ContentStatsWidget;