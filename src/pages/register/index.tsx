import {
  Center,
  Flex,
  Heading,
  Input,
  Button,
  HStack,
  VStack,
} from "@hope-ui/solid"
import { createMemo, createSignal, Show } from "solid-js"
import { useFetch, useT, useTitle, useRouter } from "~/hooks"
import { changeToken, r, notify, handleResp, admin_token } from "~/utils"
import { PEmptyResp, User } from "~/types"
import { createStore } from "solid-js/store"
import LoginBg from "../login/LoginBg"

const Register = () => {
  const t = useT()
  const [useauthn, setuseauthn] = createSignal(false)
  const { to } = useRouter()

  const [user, setUser] = createStore<User>({
    id: 0,
    username: "",
    password: "",
    base_path: "",
    role: 0,
    permission: 0,
    disabled: true,
    sso_id: "",
  })

  const [okLoading, ok] = useFetch((): PEmptyResp => {
    return r.post(`/admin/user/create`, user, {
      headers: {
        Authorization: admin_token,
      },
    })
  })

  const Register = async () => {
    if (!useauthn()) {
      const resp = await ok()
      handleResp(resp, async () => {
        notify.success(t("global.register_success"))
        to("/@login")
      })
    }
  }
  return (
    <Center zIndex="1" w="$full" h="100vh">
      <VStack
        // borderWidth="thin"
        // borderColor="$primary10"
        backgroundColor="$blackAlpha10"
        rounded="$xl"
        p="24px"
        w={{
          "@initial": "90%",
          "@sm": "364px",
        }}
        spacing="$4"
      >
        <Flex alignItems="center" justifyContent="space-around">
          {/* <Image mr="$2" boxSize="$12" src={logo()} /> */}
          <Heading
            color="$success10"
            backgroundColor="$success1"
            fontSize="$lg"
            p="$2"
            borderRadius="$sm"
          >
            {"Create an Account".toUpperCase()}
          </Heading>
        </Flex>

        <Input
          name="username"
          placeholder={t("login.username-tips")}
          value={user.username}
          onInput={(e) => setUser("username", e.currentTarget.value)}
          autocomplete="off"
        />
        <Show when={!useauthn()}>
          <Input
            name="password"
            placeholder={t("login.password-tips")}
            type="password"
            value={user.password}
            autocomplete="off"
            onInput={(e) => setUser("password", e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                Register()
              }
            }}
          />
        </Show>
        {/* <Flex
            px="$1"
            w="$full"
            fontSize="$sm"
            color="$neutral10"
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox
              checked={remember() === "true"}
              onChange={() =>
                setRemember(remember() === "true" ? "false" : "true")
              }
            >
              {t("login.remember")}
            </Checkbox>
            <Text as="a" target="_blank" href={t("login.forget_url")}>
              {t("login.forget")}
            </Text>
          </Flex> */}
        <HStack w="$full" spacing="$2">
          <Button
            w="$full"
            colorScheme="success"
            loading={okLoading()}
            onClick={Register}
          >
            Register
          </Button>
          <Show when={!useauthn()}>
            <Button
              colorScheme="warning"
              w="$full"
              onClick={() => {
                setUser("username", "")
                setUser("password", "")
              }}
            >
              {t("login.clear")}
            </Button>
          </Show>
        </HStack>
        {/* <Show when={ldapLoginEnabled}>
          <Checkbox
            w="$full"
            checked={useLdap() === true}
            onChange={() => setUseLdap(!useLdap())}
          >
            {ldapLoginTips}
          </Checkbox>
        </Show> */}
        <Button
          w="$full"
          colorScheme="accent"
          onClick={() => {
            changeToken()
            to("/")
          }}
        >
          Back to Homepage
        </Button>
        <Flex
          mt="$2"
          justifyContent="space-evenly"
          alignItems="center"
          color="$neutral10"
          w="$full"
        >
          {/* <SwitchLanguageWhite /> */}
          {/* <SwitchColorMode /> */}
          {/* <SSOLogin /> */}
        </Flex>
      </VStack>
      <LoginBg />
    </Center>
  )
}

export default Register
