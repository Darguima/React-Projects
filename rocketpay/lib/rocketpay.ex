defmodule Rocketpay do
  alias Rocketpay.Users.Create, as: UserCreate

  defdelegate create_user(prams), to: UserCreate, as: :call
end
