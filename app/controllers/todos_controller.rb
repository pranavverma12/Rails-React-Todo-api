class TodosController < ApplicationController
  before_action :set_todo, only: %i[update destroy]

  def index
  	todos = Todo.order(created_at: :desc)
  	render json: todos
  end

  def create
  	@todo = Todo.new(todo_params)

    if @todo.save
      # flash[:success] = 'Todo was successfully created.'
      render json: @todo
    else
      flash.now[:error] = I18n.t(:form_has_errors, scope: 'errors.messages')
      render :new, status: :unprocessable_entity
    end
  end

  def update
  	if @todo.update(todo_params)
      # flash[:success] = "Todo(#{@todo.id}) was successfully updated."
      render json: @todo
    else
      # flash.now[:error] = I18n.t(:form_has_errors, scope: 'errors.messages')
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
  	@todo.destroy

    # flash[:notice] = "Todo(#{@todo.id}) was successfully destroyed."
    head :no_content, status: :ok
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :completed)
	end
end
