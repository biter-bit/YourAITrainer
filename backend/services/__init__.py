from .openai_generator import ProgramGenerator
import dotenv

dotenv.load_dotenv()

program_generator = ProgramGenerator()

__all__ = ('program_generator', )