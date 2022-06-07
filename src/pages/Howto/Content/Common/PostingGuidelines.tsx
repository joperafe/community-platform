import { Heading, Text, Link, Card, Flex } from 'theme-ui'
import theme from 'src/themes/styled.theme'

export const PostingGuidelines = () => (
  <Card>
    <Flex sx={{ flexDirection: 'column' }} p={4}>
      <Heading mb={2}>How does it work?</Heading>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        1. Choose what you want to share{' '}
        <span role="img" aria-label="raised-hand">
          🙌
        </span>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        2. Read{' '}
        <Link
          color={theme.colors.blue}
          target="_blank"
          href="/academy/create/howto"
        >
          our guidelines{' '}
          <span role="img" aria-label="nerd-face">
            🤓
          </span>
        </Link>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        3. Prepare your text & images{' '}
        <span role="img" aria-label="archive-box">
          🗄️
        </span>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        4. Create your How-to{' '}
        <span role="img" aria-label="writing-hand">
          ✍️
        </span>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        5. Click on “Publish”{' '}
        <span role="img" aria-label="mouse">
          🖱️
        </span>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        6. We will either send you feedback, or
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        7. Approve if everything is okay{' '}
        <span role="img" aria-label="tick-validate">
          ✅
        </span>
      </Text>
      <Text sx={{ ...theme.typography.auxiliary }} mb={1}>
        8. Be proud{' '}
        <span role="img" aria-label="simple-smile">
          🙂
        </span>
      </Text>
    </Flex>
  </Card>
)
