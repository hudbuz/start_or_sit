class IndicesController < ApplicationController

  def index

    @index = Index.all
    render json: @index
  end



end